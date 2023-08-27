import { Component } from 'react';

import * as ImageService from 'service/image-service';
import { Button, SearchForm, Grid, GridItem, Text, CardItem } from 'components';
import { IoCompassOutline } from 'react-icons/io5';

export class Gallery extends Component {
  state = {
    query: '',
    page: 1,
    photos: [],
    totalResults: 0,
    error: null,
  };

  changeQuery = newQuery => {
    this.setState({ query: newQuery });
  };

  componentDidUpdate(prevProps, prevState) {
    const { query, page } = this.state;
    if (prevState.query !== this.state.query) {
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

  render() {
    console.log(this.state.photos);
    return (
      <>
        <SearchForm onSubmit={this.changeQuery} />
        {/* <Text textAlign="center">Sorry. There are no images ... 😭</Text> */}
      </>
    );
  }
}
