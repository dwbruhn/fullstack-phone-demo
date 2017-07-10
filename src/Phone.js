import React, { Component } from 'react';
import phoneClient from 'fullstack-phone/client';

class Phone extends Component {
    phoneHandler;
    state = {
        region: 'US',
        mobileNational: '',
        mobileInternational: '',
        fixedNational: '',
        fixedInternational: ''
    };


    // fetch metadata after first mount
    componentDidMount() {
        this.getMetadata(this.state.region);
    }

    // Get the metadata initialize phone handler
    getMetadata(region) {
        fetch(`/api/metadata/${region}`)
            .then(res => res.json())
            .then(metadata => this.initializePhoneHandler(metadata));
    }

    initializePhoneHandler(metadata) {
        this.phoneHandler = phoneClient.createHandler(metadata);
        const mobileExample = this.phoneHandler.getExampleNumberForType(this.state.region, 'MOBILE');
        const fixedExample = this.phoneHandler.getExampleNumberForType(this.state.region, 'FIXED_LINE');

        const mobileNational = this.phoneHandler.formatPhoneNumber(mobileExample, { style: 'national' });
        const mobileInternational = this.phoneHandler.formatPhoneNumber(mobileExample, { style: 'national' });

        const fixedNational = this.phoneHandler.formatPhoneNumber(fixedExample, { style: 'national' });
        const fixedInternational = this.phoneHandler.formatPhoneNumber(fixedExample, { style: 'international' });

        this.setState({
            mobileNational,
            mobileInternational,
            fixedNational,
            fixedInternational
        });
    }

    // update state for input value each time there's a change
    handleRegionSelect(event) {
        const target = event.target;
        const region = target.value;

        this.getMetadata(region);

        this.setState({
            region
        });
    }

    render() {
        return (
            <div>
                <h2>fullstack-phone Demo</h2>
                <h3>Region: {this.state.region}</h3>
                <select name="region" value={this.state.region} onChange={this.handleRegionSelect.bind(this)}>
                    <option value="US">United States</option>
                    <option value="RU">Russia</option>
                    <option value="GB">Great Britain</option>
                    <option value="AU">Australia</option>
                    <option value="MX">Mexico</option>
                </select>
                <h3>Example Numbers:</h3>
                <table>
                    <tbody>
                        <tr>
                            <td></td>
                            <th>Mobile</th>
                            <th>Fixed Line</th>
                        </tr>
                        <tr>
                            <th>National</th>
                            <td>{this.state.mobileNational}</td>
                            <td>{this.state.fixedNational}</td>
                        </tr>
                        <tr>
                            <th>International</th>
                            <td>{this.state.mobileInternational}</td>
                            <td>{this.state.fixedInternational}</td>

                        </tr>
                    </tbody>
                </table>
                <br />

            </div>
        )
    }

}

export default Phone;
