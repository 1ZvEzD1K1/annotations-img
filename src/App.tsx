import React, { FC, useState } from "react";
import Content from "./components/content/Content";
import Footer from "./components/footer/Footer";
import Header from "./components/header/Header";
import Wrapper from "./components/wrapper/Wrapper";
import { useTypedSelector } from "./redux/store";
import "./App.scss";
import Loader from "./components/loader/Loader";

const App: FC = () => {
  const [imgUrl, setImgUrl] = useState<string | null>(null);
  const { error, loading } = useTypedSelector((state) => state.annotations);

  if (error) {
    alert(error);
  }

  return (
    <Wrapper>
      {loading ? (
        <Loader />
      ) : (
        <>
          <Header setImgUrl={setImgUrl} />
          <Content imgUrl={imgUrl} />
          <Footer />
        </>
      )}
    </Wrapper>
  );
};

export default App;
