import React, { Component } from 'react';
import AsYouTypeInput from './AsYouTypeInput';

import phoneClient from 'fullstack-phone/client';

class Phone extends Component {
    phoneHandler;
    state = {
        region: 'US',
        selected: 'US',
        mobileNational: '',
        mobileInternational: '',
        fixedNational: '',
        fixedInternational: '',
        asYouTypeFormatter: undefined
    };


    // fetch metadata before first mount
    componentWillMount() {
        this.getMetadata(this.state.region);
    }

    // Get the metadata and initialize phone handler
    getMetadata(region) {
        fetch(`/api/metadata/${region}`)
            .then(res => res.json())
            .then(metadata => this.initializePhoneHandler(metadata));
    }

    initializePhoneHandler(metadata) {
        this.phoneHandler = phoneClient.createPhoneHandler(metadata);
        const mobileExample = this.phoneHandler.getExampleNumberForType('MOBILE', this.state.region, );
        const fixedExample = this.phoneHandler.getExampleNumberForType('FIXED_LINE', this.state.region);

        const mobileNational = this.phoneHandler.formatPhoneNumber(mobileExample, { style: 'national' });
        const mobileInternational = this.phoneHandler.formatPhoneNumber(mobileExample, { style: 'international' });

        const fixedNational = this.phoneHandler.formatPhoneNumber(fixedExample, { style: 'national' });
        const fixedInternational = this.phoneHandler.formatPhoneNumber(fixedExample, { style: 'international' });

        const asYouTypeFormatter = this.phoneHandler.getAsYouTypeFormatter(this.state.region);

        this.setState({
            mobileNational,
            mobileInternational,
            fixedNational,
            fixedInternational,
            asYouTypeFormatter
        });
    }

    // update state for input value each time there's a change
    handleRegionSelect(event) {
        const target = event.target;
        const selected = target.value;
        let region;

        if (selected === 'ALL') {
            this.getMetadata('');
            region = 'CN'; // just use China as an example if all metadata loaded
        } else {
            this.getMetadata(selected);
            region = selected;
        }

        this.setState({
            region,
            selected
        });
    }

    handleRegionSelect = this.handleRegionSelect.bind(this);

    render() {
        return (
            <div>
                <h2>fullstack-phone Demo</h2>
                <h3>Region: {this.state.region}</h3>
                <select name="region" value={this.state.selected} onChange={this.handleRegionSelect}>
                    <option value="AU">Australia</option>
                    <option value="DE">Germany</option>
                    <option value="GB">Great Britain</option>
                    <option value="MX">Mexico</option>
                    <option value="RU">Russia</option>
                    <option value="US">United States</option>
                    <option value="ALL">ALL</option>
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
                <AsYouTypeInput formatter={this.state.asYouTypeFormatter} />
            </div>
        )
    }

}

export default Phone;
