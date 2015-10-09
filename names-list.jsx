var React = require('react'),
    model = require('./model.js');

class NamesList extends React.Component {
    constructor() {
        this.state = {names: []}
    }

    componentDidMount() {
        this.update()
    }

    render() {
        var names = Object.keys(this.state.names).map(idx => {
            return <li key={idx}>{this.state.names[idx]}</li>
        })
        return (
            <ul>{names}</ul>
        )
    }

    update() {
        model.getValue(['names', 'length'])
            .then(length => model.get(['names', {from: 0, to: length-1}, 'name']))
            .then(response => this.setState({names: response.json.names}))
    }
}

module.exports = NamesList
