import React from 'react';
import albumApi from '../apis/album';
import AlbumList from './AlbumList';

class App extends React.Component {
    state = {
        albums: [],
        pagedAlbums: [],
        hasMore: true,
        curpage: 0,
        pagesize: 10,
        totalPage: 0,
        total: 0
      };

    getPhotosForAlbums = async albums => {
        for (const album of albums) {
            const response = await albumApi.get('/photos', {
                params: {
                    albumId: album.id
                }
            });
            album['photos'] =  [...response.data];
        }

        let curpage = this.state.curpage;
        let pagedAlbums = albums.slice(
            curpage * this.state.pagesize,
            (curpage + 1) * this.state.pagesize
        );
        console.log('curpage', this.state.curpage, 'pagedAlbums', pagedAlbums)
        
        this.setState({
            albums: albums,
            pagedAlbums: pagedAlbums,
            total: albums.length,
            totalPage: Math.ceil(albums.length / this.state.pagesize)
        });
    }

    getAlbums = async () => {
        const response = await albumApi.get('/albums');
        const albums = [...response.data];
        this.getPhotosForAlbums(albums);
    }

    loadmoreItem() {
        if (this.state.curpage + 1 < this.state.totalPage) {
            let curpage = this.state.curpage < this.state.totalPage
                            ? this.state.curpage + 1
                            : this.state.curpage;
            let pagedAlbums = this.state.albums.slice(0,(curpage + 1) * this.state.pagesize);
            this.setState({ pagedAlbums: pagedAlbums, curpage });
        } else {
            this.setState({ hasMore: false });
        }
      }
    
    componentDidMount() {
        this.getAlbums();
    }

    render() {
        if (this.state.pagedAlbums.length === 0) {
            return <h1>Please wait, loading Albums...</h1>;
        } else {
            console.log(this.state);
            return (
                <AlbumList 
                    hasMore={this.state.hasMore}
                    albums={this.state.pagedAlbums}
                    loadmoreItem={() => this.loadmoreItem()}
                />
            );
        }
    }
}

export default App;