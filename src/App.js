import React from 'react';

class App extends React.Component {
  constructor() {
    super();

    this.renderImg = this.renderImg.bind(this);
    this.fetchAPI = this.fetchAPI.bind(this);
    this.load = this.load.bind(this);
    this.toLocal = this.toLocal.bind(this);

    this.state = {
      imgObj: undefined,
      loading: true,
      imgArr: [],
    };
  }

  componentDidMount() {
    this.fetchAPI();
  }

  shouldComponentUpdate(_nextProps, nextState) {
    return !nextState.imgObj.message.includes('terrie');
  }

  load() {
    this.setState({
      loading: true,
    }, () => this.fetchAPI());
  }

  toLocal() {
    const { imgArr: arr } = this.state;
    this.setState(({ imgArr, imgObj }) => ({
      imgArr: [...imgArr, imgObj.message],
    }));
    localStorage.setItem('imgArr', arr);
    const { imgObj } = this.state;
    alert(imgObj.message);
  }

  async fetchAPI() {
    const request = await fetch('https://dog.ceo/api/breeds/image/random');
    const obj = await request.json();
    this.setState({
      imgObj: obj,
      loading: false,
    }, () => this.toLocal());
  }

  renderImg() {
    const { imgObj } = this.state;
    return (
      <>
        <img src={ imgObj.message } alt="dogImage" />
        { console.log(imgObj.message)}
        <button type="button" onClick={ this.load }>Another One!</button>
      </>
    );
  }

  render() {
    const { loading } = this.state;
    return (
      <div>
        { loading ? <span>Loading...</span> : this.renderImg() }
      </div>
    );
  }
}

export default App;
