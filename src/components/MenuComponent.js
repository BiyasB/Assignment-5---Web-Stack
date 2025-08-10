import React, { Component } from "react";
import {
  Card,
  CardImg,
  CardImgOverlay,
  CardTitle,
  Breadcrumb,
  BreadcrumbItem,
} from "reactstrap";
import DishDetail from "./DishDetailComponent";
import { COMMENTS } from "../shared/comments";
function RenderMenuItem({ dish, onClick }) {
  return (
    <Card
      onClick={() => onClick(dish)}
      style={{ cursor: "pointer", maxWidth: "500px" }}
    >
      <CardImg width="100%" src={dish.image} alt={dish.name} />
      <CardImgOverlay>
        <CardTitle style={{ fontWeight: "bold" }}>{dish.name}</CardTitle>
      </CardImgOverlay>
    </Card>
  );
}

class Menu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedDish: null,
    };
  }

  onDishSelect(dish) {
    const comments = COMMENTS.filter((c) => c.dishId === dish.id);
    const dishWithComments = { ...dish, comments };
    this.setState({ selectedDish: dishWithComments });
  }

  render() {
    const menu = this.props.dishes.map((dish) => (
      <div className="col-12 col-md-5 m-1" key={dish.id}>
        <RenderMenuItem dish={dish} onClick={(d) => this.onDishSelect(d)} />
      </div>
    ));

    return (
      <div className="container">
        <div className="row">
          <Breadcrumb>
            <BreadcrumbItem>Home</BreadcrumbItem>
            <BreadcrumbItem active>Menu</BreadcrumbItem>
          </Breadcrumb>
          <div className="col-12">
            <h3>Menu</h3>
            <hr />
          </div>
        </div>

        <div className="row">{menu}</div>

        {this.state.selectedDish && (
          <DishDetail dish={this.state.selectedDish} />
        )}
      </div>
    );
  }
}

export default Menu;
