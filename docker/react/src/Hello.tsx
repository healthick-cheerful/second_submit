import React from 'react';
import { isPropertySignature } from 'typescript';
type Props = {
    name: string;
}
class Hello extends React.Component<Props, {}> {
    render() {
        return (
            <div className="Test">
                <h1>Hello {this.props.name}</h1>
            </div>
        );
    }
}

export default Hello;