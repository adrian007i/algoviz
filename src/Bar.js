 
function Bar(props) {
  return (
    <div className="bar" style={{"height" : props.value * 3, "order": props.id  }} id={"bar_"+props.id}>{props.value}</div>
  );
}

export default Bar;
