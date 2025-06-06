import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

function BasicExample({titulo, desc, img, but}) {
  return (
    <Card style={{ width: '18rem' }}>
      <Card.Img variant="top" src={img} />
      <Card.Body>
        <Card.Title>{titulo}</Card.Title>
        <Card.Text>
          {desc}
        </Card.Text>
        <Button variant="primary">Adiquirir</Button>
        {but}
      </Card.Body>
    </Card>
  );
}

export default BasicExample;