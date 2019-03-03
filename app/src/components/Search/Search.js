import React, { Component } from 'react'

// MATERIAL-UI
import TextField from 'material-ui/TextField'
import SelectField from 'material-ui/SelectField'
import MenuItem from 'material-ui/MenuItem'

import axios from 'axios'

import ImageResults from '../ImageResults/ImageResults.js'

export default class Search extends Component {
  state = {
    searchText: '',
    amount: 15,
    apiUrl: 'https://pixabay.com/api',
    apiKey: '11772215-5cab39c2a5051ef578a361bc9',
    images: []
  }
  handleChange = e => {
    e.preventDefault();
    const { name, value } = e.target;
    this.setState({
      [name]: [value]
    }, () => {
      if(value === '') {
        this.setState({ images: []})
      } else {
        axios.get(`${this.state.apiUrl}/?key=${this.state.apiKey}&q=${this.state.searchText}&image_type=photo&per_page=${this.state.amount}&safesearch=true`)
          .then(res => {
            this.setState({ images: res.data.hits})
          })
          .catch(err => {
            console.log(err)
          })
      }
    })
  }
  handleSelect = (e, index, value) => {
    e.preventDefault();
    this.setState({ amount: value })
  }
  render() {
    return (
      <div>
        <TextField
          name="searchText" 
          value={this.state.searchText}
          floatingLabelText="Search For Images"
          fullWidth={true}
          onChange={this.handleChange}
        />
        <br/>
        <SelectField
         floatingLabelText="Amount"
         label={this.state.amount}
         value={this.state.amount}
         onChange={this.handleSelect}
        >
          <MenuItem value={5} primaryText="5" />
          <MenuItem value={10} primaryText="10" />
          <MenuItem value={15} primaryText="15" />
          <MenuItem value={30} primaryText="30" />
          <MenuItem value={50} primaryText="50" />
        </SelectField>
        <br />
        {this.state.images.length > 0 && (<ImageResults images ={this.state.images}/>)}
      </div>
    )
  }
}