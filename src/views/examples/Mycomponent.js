import React from "react";

class Mycomponent extends React.Component {
    state = {
        name: "MyComponent",
        channel: 'Tập code reactJS'
    }
    handleOnChangeName = (event) => {
        this.setState({ name: event.target.value });
    }

    render() {
        // let name = "My Component";
        return (
            // Block
            // <div>
            //     <div className="first">
            //         Hello Mycomponent
            //     </div>
            //     <div className="second"></div>
            // </div>

            //Fragment
            // <>
            //     <div className="first">
            //         Hello Mycomponent
            //     </div>
            //     <div className="second">second</div>
            // </>

            <React.Fragment>
                <div className="first">
                    <div>
                        <input value={this.state.name} type="text" onChange={(event) => this.handleOnChangeName(event)} />
                    </div>
                    Hello {this.state.name}
                </div>
                <div className="second">{this.state.channel}</div>
            </React.Fragment>

        );
    }
}
// function Mycomponent() {
//     return (
//         <div>Hello Mycomponent2</div>
//     );
// }

export default Mycomponent;