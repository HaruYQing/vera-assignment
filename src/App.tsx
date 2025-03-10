// import { useState } from 'react'
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { createTheme, ThemeProvider } from "@mui/material";
import MainPage from "./pages/MainPage";
import PostDetailsPage from "./pages/PostDetailsPage";
import { AuthProvider } from "./contexts/AuthProvider";

const theme = createTheme({
  // TO-DO: 主題設置
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<MainPage />} />
            <Route path="/post/:postId" element={<PostDetailsPage />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
