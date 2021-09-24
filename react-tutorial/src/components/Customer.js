import React from 'react';

class Customer extends React.Component {
    
    render() {  //Component에 포함
        return(
            <div>
                <h2>{this.props.data.name}</h2>
                <p>{this.props.data.birthday}</p>
                <p>{this.props.data.job}</p>
                <p>{this.props.data.sex}</p>
            </div>
        );
    }
}

export default Customer;    // Customer class는 위에 정의 되어 있다