import React, { Component } from 'react';
import Butter from 'buttercms'

const butter = Butter('7b0262d7e08ef9b71e7ffb4c9c96d81773029050');

class Blog extends Component {

  constructor(props) {
    super(props);

    this.state = {
      content: null
    };
  }

  componentWillMount() {
    butter.page.retrieve('*', 'blog').then((resp) => {
      this.setState({
        content: resp.data.data
      })
    });
  }

  render() {
    if (this.state.content) {
      const homepage = this.state.content;

      return (

<div>
            <meta property="og:title" content="{homepage.facebook_open_graph_title}" />
            <h1>{homepage.headline}</h1>
            <img width="100%" src="{homepage.hero_image}"/>
            <button>{homepage.call_to_action}</button>
            <h3>Customers Love Us!</h3>

            {homepage.customer_logos}
</div>
      );
    } else {
      return (
        <div>
          Loading...
        </div>
      );
    }
  }
}

export default Blog;
