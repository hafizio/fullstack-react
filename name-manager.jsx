var React = require('react'),
    NameAdder = require('./name-adder.jsx'),
    NamesList = require('./names-list.jsx');

class NameManager extends React.Component {
    handleNameAdded() {
        this.refs.namesList.update()
    }

    render() {
        return (
            <div>
                <NameAdder url="/name" onAdded={this.handleNameAdded.bind(this)}/>
                <NamesList url="/names" ref="namesList"/>
            </div>
        )
    }
}

React.render(<NameManager/>, document.querySelector('#demo'))