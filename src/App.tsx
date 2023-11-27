import "./App.css";
import BackgroundWrapper from "./components/BackgroundWrapper/BackgroundWrapper";
import ClearButton from "./components/ClearButton/ClearButton";
import Footer from "./components/Footer/Footer";
import Header from "./components/Header/Header";
import InfoBlock from "./components/InfoBlock/InfoBlock";
import InputIcao from "./components/InputIcao/InputIcao";
import MetarProvider from "./context/MetarProvider";

function App() {
  return (
    <MetarProvider>
      <BackgroundWrapper>
        <Header />
        <main className="content">
          <InputIcao />
          <ClearButton />
          <InfoBlock />
        </main>
        <Footer />
      </BackgroundWrapper>
    </MetarProvider>
  );
}

export default App;
