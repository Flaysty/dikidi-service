import React from 'react'
import { connect } from 'react-redux'

export default function(ComposedComponent) {
    class Authenticate extends React.Component {
        componentWillMount() {
            if (this.props.isAuthenticated) {
                this.props.history.push('/home')
            }
        }

        componentWillUpdate(nextProps) {
            if (nextProps.isAuthenticated) {
                this.props.history.push('/home')
            }
        }

        render() {
            return (
                <ComposedComponent {...this.props} />
            )
        }
    }

    const mapStateToProps = (state) => {
        return {
            isAuthenticated: state.auth.isAuthenticated
        }
    }

    return connect(mapStateToProps)(Authenticate);
}