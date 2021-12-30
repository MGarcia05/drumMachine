const projectName = "drum-machine";

const audioClips = [
  {
    keyCode: 81,
    keyTrigger: 'Q',
    id: 'Heater-1',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-1.mp3'
  },
  {
    keyCode: 87,
    keyTrigger: 'W',
    id: 'Heater-2',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-2.mp3'
  },
  {
    keyCode: 69,
    keyTrigger: 'E',
    id: 'Heater-3',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-3.mp3'
  },
  {
    keyCode: 65,
    keyTrigger: 'A',
    id: 'Heater-4',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-4_1.mp3'
  },
  {
    keyCode: 83,
    keyTrigger: 'S',
    id: 'Clap',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-6.mp3'
  },
  {
    keyCode: 68,
    keyTrigger: 'D',
    id: 'Open-HH',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Dsc_Oh.mp3'
  },
  {
    keyCode: 90,
    keyTrigger: 'Z',
    id: "Kick-n'-Hat",
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Kick_n_Hat.mp3'
  },
  {
    keyCode: 88,
    keyTrigger: 'X',
    id: 'Kick',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/RP4_KICK_1.mp3'
  },
  {
    keyCode: 67,
    keyTrigger: 'C',
    id: 'Closed-HH',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Cev_H2.mp3'
  }
];


// main App

function App() {

    const [volume, setVolume] = React.useState(1);

  return <div id="drum-machine" className="text-white mt-5">
    <div className="text-center">
      <h2>Drum Machine</h2>
      {audioClips.map(clip => (
        <Pad key={clip.id} clip={clip} volume={volume} />
      ))}

      <br />
      <h4>Volume</h4>
      <input
      type="range"
      step="0.01"
      onChange={(e) => setVolume(e.target.value)}
      value={volume}
      max="1"
      min="0"
      className="w-47"/>

    </div>
      <div id="display">
        <div className="card mx-auto my-3 py-3">
          <h3 id="displayClipName" className="text-center text-secondary">Nothing yet</h3>
        </div>
      </div>
  </div>;
}

function Pad({clip, volume}){
      // active states

  const [active, setActive] = React.useState(false);

      // event listeners for keyboard events
  React.useEffect(() => {
    document.addEventListener("keydown", handleKeyPress);
    return () => {
      document.removeEventListener("keydown", handleKeyPress);
    };
  }, []);

  const handleKeyPress = (e) => {
    if (e.keyCode === clip.keyCode) {
      playClip();
      displayClip();
    }
  };

  const playClip = () => {
    const audioTag = document.getElementById(clip.keyTrigger);
    setActive(true);
    setTimeout(() => setActive(false), 150);
    audioTag.volume = volume;
    audioTag.currentTime = 0;
    audioTag.play();
    let displayField = document.getElementById("displayClipName");
    displayField.innerHTML = clip.id;
  }

  const displayClip = () => {

  }
    // play with click & added active status
  return (

    <div
    onClick={playClip}
    id={clip.id}
    className={`btn btn-secondary p-4 m-3 drum-pad ${active && "btn-info"}`}
    >
      <audio className="clip"
      id={clip.keyTrigger}
      src={clip.url}/>
      {clip.keyTrigger}
    </div>
  );
}

ReactDOM.render(<App />, document.getElementById("content"));
