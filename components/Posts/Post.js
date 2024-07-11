  import PropTypes from 'prop-types';
  import React, { useRef } from 'react';
  import styled from '@emotion/styled';

  const PostContainer = styled.div(() => ({
    width: '300px',
    margin: '10px',
    border: '1px solid #ccc',
    borderRadius: '5px',
    overflow: 'hidden',
  }));

  const CarouselContainer = styled.div(() => ({
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
  }));

  const Carousel = styled.div(() => ({
    display: 'flex',
    overflowX: 'scroll',
    scrollbarWidth: 'none',
    msOverflowStyle: 'none',
    '&::-webkit-scrollbar': {
      display: 'none',
    },
    scrollSnapType: 'x mandatory',
    position: 'relative',
  }));

  const CarouselItem = styled.div(() => ({
    flex: '0 0 auto',
    scrollSnapAlign: 'start',
  }));

  const Image = styled.img(() => ({
    width: '280px',
    height: 'auto',
    maxHeight: '300px',
    padding: '10px',
  }));

  const Content = styled.div(() => ({
    padding: '10px',
    '& > h2': {
      marginBottom: '16px',
    },
  }));

  const Button = styled.button(() => ({
    position: 'absolute',
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    border: 'none',
    color: '#000',
    fontSize: '20px',
    cursor: 'pointer',
    height: '50px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1,
  }));

  const PrevButton = styled(Button)`
    left: 10px;
  `;

  const NextButton = styled(Button)`
    right: 10px;
  `;

  const Post = ({ post }) => {
    const carouselRef = useRef(null);

    const handleNextClick = () => {
      if (carouselRef.current) {
        const imageWidth = carouselRef.current.querySelector('img').clientWidth + 20; // Including padding
        carouselRef.current.scrollBy({
          left: imageWidth,
          behavior: 'smooth',
        });
      }
    };

    const handlePrevClick = () => {
      if (carouselRef.current) {
        const imageWidth = carouselRef.current.querySelector('img').clientWidth + 20; // Including padding
        carouselRef.current.scrollBy({
          left: -imageWidth,
          behavior: 'smooth',
        });
      }
    };

    return (
      <PostContainer>
        <CarouselContainer>
          <PrevButton onClick={handlePrevClick}>&#10094;</PrevButton>
          <Carousel ref={carouselRef}>
            {post.images.map((image, index) => (
              <CarouselItem key={index}>
                <Image src={image.url} alt={post.title} />
              </CarouselItem>
            ))}
          </Carousel>
          <NextButton onClick={handleNextClick}>&#10095;</NextButton>
        </CarouselContainer>
        <Content>
          <h2>{post.title}</h2>
          <p>{post.body}</p>
        </Content>
      </PostContainer>
    );
  };

  Post.propTypes = {
    post: PropTypes.shape({
      title: PropTypes.string.isRequired,
      body: PropTypes.string.isRequired,
      images: PropTypes.arrayOf(
        PropTypes.shape({
          url: PropTypes.string.isRequired,
        })
      ).isRequired,
    }).isRequired,
  };

  export default Post;
