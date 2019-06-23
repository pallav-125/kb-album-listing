import React from 'react';
import AlbumItem from './AlbumItem';
import InfiniteScroll from 'react-infinite-scroller';
import '../css/album.scss';

const AlbumList = ({hasMore, albums, loadmoreItem}) => {
    const renderedAlbums = albums.map(album => {
        return <AlbumItem key={album.id} album={album} />;
    });

    return (
        <div className="album-list">
            <InfiniteScroll
                pageStart={0}
                loadMore={loadmoreItem}
                hasMore={hasMore}
                loader={
                    <div className="loader" key={0}>
                        Loading ...
                    </div>
                }
                useWindow={false}
                threshold={350}
            >
                {renderedAlbums}
            </InfiniteScroll>
        </div>
    );
}

export default AlbumList;