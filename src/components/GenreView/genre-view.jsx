import './genre-view.scss';

export class GenreView extends React.Component {
  render() {
    const { genre, onBackClick } = this.props;

    return (
      <Container>
        <Card className="genre-view">
          <Card.Header className="genre-view-header">Genre</Card.Header>
          <Card.Body className="genre-view-title">{genre.Name}</Card.Body>
          <Card.Body>{genre.Description}</Card.Body>
          <Card.Footer>
            <Button
              className="genre-view-button"
              onClick={() => {
                onBackClick();
              }}
            >
              Back
            </Button>
          </Card.Footer>
        </Card>
      </Container>
    );
  }
}

GenreView.proptypes = {
  Genre: PropTypes.shape({
    Name: PropTypes.string.isRequired,
    Description: PropTypes.string.isRequired,
  }).isRequired,
};
