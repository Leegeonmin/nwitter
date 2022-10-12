import { dbService } from "FbInstance";
import { query } from "firebase/database";
import { addDoc, collection, onSnapshot, orderBy } from "firebase/firestore";
import React, { useEffect, useState } from "react";
const Home = ({ userObj }) => {
  const [nweet, setNweet] = useState("");
  const [nweets, setNweets] = useState([]);
  useEffect(() => {
    const dbQuery = query(
      collection(dbService, "nweets"),
      orderBy("createdAt", "desc")
    );
    onSnapshot(dbQuery, (querySnapshot) => {
      const nweetArray = querySnapshot.docs.map((e) => ({
        id: e.id,
        ...e.data(),
      }));
      setNweets((prev) => [prev, ...nweetArray]);
    });
  }, []);

  const onSubmit = async (event) => {
    event.preventDefault();
    await addDoc(collection(dbService, "nweets"), {
      text: nweet,
      createdAt: Date.now(),
      creatorId: userObj.uid,
    });
  };
  const onChange = (event) => {
    setNweet(event.target.value);
  };
  return (
    <div>
      <form onSubmit={onSubmit}>
        <span>Home</span>
        <input
          onChange={onChange}
          type="text"
          placeholder="What's on your mind?"
          maxLength={120}
          value={nweet}
          required
        />
        <input type="submit" value="Nweet" />
      </form>
      <div>
        {nweets.map((nweet) => {
          return (
            <div key={nweet.id}>
              <h4>{nweet.text}</h4>
            </div>
          );
        })}
      </div>
    </div>
  );
};
export default Home;
