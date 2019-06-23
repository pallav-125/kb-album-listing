import React from 'react';
import InfiniteCarousel from 'react-leaf-carousel';

const AlbumItem = ({album}) => {
    const albumPhotos = album.photos.map(cover => {
        return (
            <div key="alcoverb.id">
                <img src="https://via.placeholder.com/150/92c952" alt="{cover.title}" />
                <p className="cover-title" title={cover.title}>{cover.title}</p>
                <p>id: {cover.id}</p>
            </div>
        );
    });

    return (
        <div className="album-item">
            <h3>{album.title}</h3>
            <p>
                <span>id: {album.id} </span>
                <span>userid: {album.userId}</span>
            </p>
            <InfiniteCarousel
                breakpoints={[
                {
                    breakpoint: 500,
                    settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                    },
                },
                {
                    breakpoint: 768,
                    settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3,
                    },
                },
                ]}
                showSides={true}
                sidesOpacity={.5}
                sideSize={.2}
                slidesToScroll={4}
                slidesToShow={5}
                lazyLoad={true}>
                {albumPhotos}
            </InfiniteCarousel>
            
        </div>
    );
}

export default AlbumItem;