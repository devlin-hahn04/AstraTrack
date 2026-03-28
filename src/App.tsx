import GlobeView from "./globe/globe_view";

function App() {
  return (
    <div style={{ 
      width: "100vw", 
      height: "100vh", 
      margin: 0,
      padding: 0,
      position: "fixed",
      top: 0,
      left: 0,
      overflow: "hidden"
    }}>
      <GlobeView />
    </div>
  );
}

export default App;
