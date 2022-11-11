import axios from "axios";
axios.post('../index.php')
.then(function (response) {
    console.log(response);
})

function Hello() {
  return (
    <div className="Hello">
    </div>
  );
}

export default Hello;