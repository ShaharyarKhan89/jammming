import React from 'react';
import './App.css';
import Spotify from '../src/util/Spotify';
import SearchBar from '../SearchBar/SearchBar';
import SearchResults from '../SearchResults/SearchResults';
import Playlist from '../Playlist/Playlist';


class App extends React.Component  {
  constructor(props){
    super(props);
     this.state = { searchResults: [], playlistTracks: [], playlistName: 'New Playlist' };
     this.addTrack = this.addTrack.bind(this);
      this.removeTrack = this.removeTrack.bind(this);
      this.updatePlaylistname = this.updatePlaylistname.bind(this);
      this.savePlaylist = this.savePlaylist.bind(this);
      this.search = this.search.bind(this);
  }


  addTrack(track){
      if(!this.state.playlistTracks.find(playlistTrack=>playlistTrack.id === track.id)){
this.state.playlistTracks.push(track); //   playlistTracks: [...prevState.playlistTracks, track]
      }
  }

  removeTrack(track){
   let newPlaylistTracks = this.state.playlistTracks.filter(plTrack => plTrack.id !== track.id  );
this.setState({playlistTracks: newPlaylistTracks});
    
  }

  updatePlaylistname(name){
this.setState({playlistName:name});
  }
savePlaylist(){
   let playlistArray = this.state.playlistTracks;
    let uriArray = playlistArray.map(track => track.uri);
    Spotify.savePlaylist(this.state.playlistName, uriArray);
    this.setState({ playlistTracks: [], playlistName: 'New Playlist' });
  }
  search(term){
Spotify.search(term).then(searchResults => this.setState({
  searchResults : searchResults
}));
  }
  render() {
    return (
      <div>
  <h1> Ja <span className="highlight"> mmm </span> ing </h1>
  <div className="App">
    <SearchBar onSearch = {this.state.search} />
    <div className="App-playlist">
      <SearchResults  searchResults = {this.state.searchResults}/>
      <Playlist playlistName = {this.state.playlistName} 
       playlistTracks = {this.state.playlistTracks} onNameChange = {this.updatePlaylistname} onSave = {this.state.savePlaylist} />
    </div>
  </div>
</div>
    );
  }
}

export default App;
