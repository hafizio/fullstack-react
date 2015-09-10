var React = require('react'),
    model = require('./model.js');

class NamesList extends React.Component {
    constructor(props) {
        super(props)
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
        model.get(['names', {from: 0, to: 100}, 'name']).
            then(response => this.setState({names: response.json.names}))
    }
}

module.exports = NamesList