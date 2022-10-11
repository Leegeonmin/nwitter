import { dbService } from "FbInstance";
import { query } from "firebase/database";
import { addDoc, collection, doc, getDocs } from "firebase/firestore";
import React, { useEffect, useState } from "react";
const Home = () => {
  const [nweet, setNweet] = useState("");
  const [nweets, setNweets] = useState([]);
  const getNweets = async () => {
    const dbQuery = await query(collection(dbService, "nweets"));
    const querySnapshot = await getDocs(dbQuery);
    querySnapshot.forEach((e) => {
      const nweetObj = {
        ...e.data(),
        id: e.id,
      };
      setNweets((prev) => [nweetObj, ...prev]);
    });
  };
  useEffect(() => {
    setNweets([]);
    getNweets();
  }, []);
  const onSubmit = async (event) => {
    event.preventDefault();
    const data = await addDoc(collection(dbService, "nweets"), {
      nweet: nweet,
      createdAt: Date.now(),
    });
    console.log(data);
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
              <h4>{nweet.nweet}</h4>
            </div>
          );
        })}
      </div>
    </div>
  );
};
export default Home;
