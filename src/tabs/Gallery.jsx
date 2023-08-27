import { Component } from 'react';

import * as ImageService from 'service/image-service';
import { Button, SearchForm, Grid, GridItem, Text, CardItem } from 'components';
import { IoCompassOutline } from 'react-icons/io5';
import { queries } from '@testing-library/react';

export class Gallery extends Component {
  state = {
    query: '',
    page: 1,
    photos: [],
    totalResults: 0,
    error: null,
  };

  changeQuery = newQuery => {
    this.setState({
      query: newQuery,
      page: 1,
      photos: [],
      totalResults: 0,
      error: null,
    });
  };

  componentDidUpdate(prevProps, prevState) {
    const { query, page } = this.state;
    if (
      prevState.query !== this.state.query ||
      prevState.page !== this.state.page
    ) {
      this.getPhotos(query, page);
    }
  }

  getPhotos = async (query, page) => {
    try {
      const { photos, total_results } = await ImageService.getImages(
        query,
        page
      );
      this.setState(prevState => ({
        photos: [...prevState.photos, ...photos],
        totalResults: total_results,
      }));
    } catch (error) {
      this.setState({ error: error.message });
    }
  };

  loadmore = () => {
    this.setState(prevState => ({ page: prevState.page + 1 }));
  };

  render() {
    console.log(this.state.photos);
    const { photos, totalResults, error, query } = this.state;
    return (
      <>
        <SearchForm onSubmit={this.changeQuery} />
        <Grid>
          {photos.map(({ id, avg_color, alt, src }) => {
            return (
              <GridItem key={id}>
                <CardItem color={avg_color}>
                  <img src={src.large} alt={alt} />
                </CardItem>
              </GridItem>
            );
          })}
        </Grid>
        {photos.length !== 0 && totalResults !== photos.length && (
          <Button onClick={this.loadmore}>Load more</Button>
        )}
        {error !== null && (
          <Text textAlign="center"> Something went wrong {error} ... 😭</Text>
        )}
        {totalResults === 0 && query !== '' && (
          <Text textAlign="center">
            {' '}
            There is no images with {query} ... 😭
          </Text>
        )}
      </>
    );
  }
}
