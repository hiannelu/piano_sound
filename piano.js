const pianoKey = [{
  keyTrigger: "A",
  note: "Do",
  type: "white-key",
  url: "https://raw.githubusercontent.com/hiannelu/piano_sound/master/c.mp3"
}, {
  keyTrigger: "W",
  note: "Do#",
  type: "black-key",
  url: "https://raw.githubusercontent.com/hiannelu/piano_sound/master/c%23.mp3"
}, {
  keyTrigger: "S",
  note: "Re",
  type: "white-key",
  url: "https://raw.githubusercontent.com/hiannelu/piano_sound/master/d.mp3"
}, {
  keyTrigger: "E",
  note: "Re#",
  type: "black-key",
  url: "https://raw.githubusercontent.com/hiannelu/piano_sound/master/d%23.mp3"
}, {
  keyTrigger: "1",
  note: "space",
  type: "black-key"
}, {
  keyTrigger: "D",
  note: "Mi",
  type: "white-key",
  url: "https://raw.githubusercontent.com/hiannelu/piano_sound/master/e.mp3"
}, {
  keyTrigger: "F",
  note: "Fa",
  type: "white-key",
  url: "https://raw.githubusercontent.com/hiannelu/piano_sound/master/f.mp3"
}, {
  keyTrigger: "U",
  note: "Fa#",
  type: "black-key",
  url: "https://raw.githubusercontent.com/hiannelu/piano_sound/master/f%23.mp3"
}, {
  keyTrigger: "I",
  note: "Sol#",
  type: "black-key",
  url: "https://raw.githubusercontent.com/hiannelu/piano_sound/master/g%23.mp3"
}, {
  keyTrigger: "O",
  note: "La#",
  type: "black-key",
  url: "https://raw.githubusercontent.com/hiannelu/piano_sound/master/a%23.mp3"
}, {
  keyTrigger: "J",
  note: "Sol",
  type: "white-key",
  url: "https://raw.githubusercontent.com/hiannelu/piano_sound/master/g.mp3"
}, {
  keyTrigger: "K",
  note: "La",
  type: "white-key",
  url: "https://raw.githubusercontent.com/hiannelu/piano_sound/master/a.mp3"
}, {
  keyTrigger: "L",
  note: "Ti",
  type: "white-key",
  url: "https://raw.githubusercontent.com/hiannelu/piano_sound/master/b.mp3"
}];
const spanStyle = {
  color: "#C0392B"
};

class Piano extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      keyTrigger: "",
      url: "",
      display: "",
      type: ""
    };
    this.handleKeyPress = this.handleKeyPress.bind(this);
    this.playSound = this.playSound.bind(this);
    this.whiteKey = this.whiteKey.bind(this);
    this.blackKey = this.blackKey.bind(this);
  }

  whiteKey() {
    return pianoKey.filter(x => x.type === "white-key").map(x => /*#__PURE__*/React.createElement("button", {
      className: "white-key",
      id: x.note,
      onClick: () => {
        this.setState({
          keyTrigger: x.keyTrigger,
          url: x.url,
          display: x.note,
          type: "white-key"
        }, () => this.playSound());
      }
    }, /*#__PURE__*/React.createElement("audio", {
      id: x.keyTrigger,
      src: x.url
    }), x.keyTrigger));
  }

  blackKey() {
    return pianoKey.filter(x => x.type === "black-key").map(x => /*#__PURE__*/React.createElement("button", {
      className: "black-key",
      id: x.note,
      onClick: () => {
        this.setState({
          keyTrigger: x.keyTrigger,
          url: x.url,
          display: x.note,
          type: "black-key"
        }, () => this.playSound());
      }
    }, /*#__PURE__*/React.createElement("audio", {
      id: x.keyTrigger,
      src: x.url
    }), x.keyTrigger));
  }

  componentDidMount() {
    document.addEventListener("keydown", this.handleKeyPress);
  }

  handleKeyPress(event) {
    this.setState({
      keyTrigger: event.key.toUpperCase(),
      display: pianoKey.find(x => {
        if (x.keyTrigger === event.key.toUpperCase()) {
          return x;
        }
      }).note,
      type: pianoKey.find(x => {
        if (x.keyTrigger === event.key.toUpperCase()) {
          return x;
        }
      }).type
    });
    this.playSound();
  }

  playSound() {
    let activeStyle = document.getElementById(this.state.display);
    let sound = document.getElementById(this.state.keyTrigger);
    activeStyle.style.background = "#009CFF";
    sound.play();

    if (this.state.type === "black-key") {
      function inactiveBlack() {
        $(".black-key").css("background-image", "linear-gradient(to bottom, black, gray)");
      }

      setTimeout(() => inactiveBlack(), 300);
    } else {
      function inactiveWhite() {
        $(".white-key").css("background-color", "white");
      }

      setTimeout(() => inactiveWhite(), 300);
    }
  }

  render() {
    return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
      id: "wrap-piano"
    }, /*#__PURE__*/React.createElement("div", {
      id: "title-piano"
    }, "Drum Machine"), /*#__PURE__*/React.createElement("div", {
      id: "text-piano"
    }, "You're now playing note: ", /*#__PURE__*/React.createElement("span", {
      style: spanStyle
    }, this.state.display)), /*#__PURE__*/React.createElement("div", {
      id: "wrap-white-key"
    }, this.whiteKey()), /*#__PURE__*/React.createElement("div", {
      id: "wrap-black-key"
    }, this.blackKey())));
  }

}

ReactDOM.render( /*#__PURE__*/React.createElement(Piano, null), document.getElementById("piano"));
