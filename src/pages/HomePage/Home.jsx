import React, { useContext, useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import classes from "./home.module.css";
import Avatar from "react-avatar";
import { MdKeyboardArrowRight } from "react-icons/md";
import axios from "../../axiosConfig";
import { Link } from "react-router-dom";
import { appState } from "../../App";
import Header from "../../Componenets/Header/Header";
import Footer from "../../Componenets/Footer/Footer";

function Home() {
  const { user } = useContext(appState);
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    // Async function to fetch questions
    const fetchQuestions = async () => {
      try {
        const { data } = await axios.get("/question"); // Fetch questions
        setQuestions(data); // Update state with fetched questions
      } catch (error) {
        console.error("Error fetching questions:", error?.response?.data || error.message);
      }
    };

    fetchQuestions(); // Call the function
  }, []); // Empty dependency array ensures it runs only once

  return (
    <>
    <Header/>
    <div className={classes.questionContainer}>
      {/* Top Section */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <Link to="/AskQuestion" className={`btn btn-primary ${classes.askButton}`}>
          Ask Question
        </Link>
        <div>
          <small className={classes.welcomeText}>Welcome: {user?.username}</small>
        </div>
      </div>

      {/* Search Bar */}
      <input
        type="search"
        className={`form-control ${classes.searchInput}`}
        placeholder="Search questions..."
      />
      <div>
        {questions?.length > 0 ? (
          questions?.map((question,i) => {
            return(  
            <div key={i} className={classes.avatarSection}>
             <div className={classes.avatar_user}>
            {/* Avatar */}
            <Avatar
              name={user?.username}
              size="50"
              round
              className={classes.userAvatar}
            />
              <small className={classes.usernameText}>{question?.username}</small>
             </div>
            {/* {/* Title /} */}
            <div className={`ms-3 ${classes.title}`}>
              <Link to={`/question/${question?.questionid}`} className={classes.questionTitle}>{question?.title}</Link>
              <MdKeyboardArrowRight size={30} className={classes.arrowIcon} />
            </div>
          </div>
              )  
          })                             
        ) : (
          <p>No question Found</p>
        )}
      </div>
    </div>
    <Footer/>
    </>
  );
}

export default Home;