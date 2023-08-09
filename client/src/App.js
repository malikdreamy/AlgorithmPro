import React, { useState } from "react";
import { ApolloClient, ApolloProvider, InMemoryCache, createHttpLink } from "@apollo/client";
import Navbar from "./components/Navbar";
import FilePages from './pages/SavedWork'
import Homepage from "./pages/Homepage";
import Footer from "./components/Footer";
import CHAT from "../src/components/CHAT";
import Login from "./pages/Loginpage"
import Profile from "./pages/Profile";
import { setContext } from "@apollo/client/link/context"
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Auth from "./utils/auth"
const httpLink = createHttpLink({
  uri: '/graphql',
});
const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = localStorage.getItem('id_token');
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});
const client = new ApolloClient({
  // Set up our client to execute the `authLink` middleware prior to making the request to our GraphQL API
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});


function App({sendToChild}) {

  const [files, setFiles] = useState([]);

  //console.log(files)
  const updateFiles = (newFiles) => {
    setFiles(newFiles);
  };
  
  const handleClick = () =>{
    //console.log("beee")
    
  }
  
  const handle = function handleFromChild(files){

return files;
  //sendToChild(files)
  //setFiles(files)

}



  return (
    <ApolloProvider client={client}>
    <Router>
      <Navbar className="relative" style={{zIndex: '9999'}}/>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/chat" element={<CHAT files={files} sendToApp={handle} />}/>
        <Route path="/files" element={<FilePages files={files} updateFiles={updateFiles} handleFromChild={handle}/>}/>
        <Route path="/login" element={<Login />} />
        <Route exact path="/profile" element = {<Profile/>}/>

      </Routes>
      <Footer />
    </Router>
    </ApolloProvider>
  );
}

export default App;
