import React from 'react';
import axios from 'axios';

export default class FixedSchedule extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            traveler: {},
            att: 0,
            act: 0,
            res: 0
        }
    }

    getTraveler = () => {
        let url = "http://192.168.0.89:9000/traveler/select";
        let data = new FormData();
        data.append("num", this.props.schedule[0].tnum);
        axios.post(url, data).then((res) => {
            this.setState({
                traveler: res.data
            });
        });
    }

    count = () => {
        this.props.schedule.map((item) => {
            if (item.type === 1) {
                this.setState(prev => {
                    return {
                        att: prev.att + 1
                    }
                });
            } else if (item.type === 2) {
                this.setState(prev => {
                    return {
                        act: prev.act + 1
                    }
                });
            } else if (item.type === 3) {
                this.setState(prev => {
                    return {
                        res: prev.res + 1
                    }
                });
            }
        })
    }

    handleChat = () => {
        this.props.history.push(`/chat/${this.props.schedule[0].gnum}/${this.props.schedule[0].tnum}`);
    }

    handleDetail = () => {
        this.props.history.push(`/guide/schedule/detail/${this.props.schedule[0].gnum}/${this.props.schedule[0].tnum}`);
    }

    componentDidMount() {
        this.getTraveler();
        this.count();
    }

    render() {
        return (
            <div className="schedule_traveler_info">
                <div className="container">
                    <img src={`http://192.168.0.89:9000/image/${this.state.traveler.img}`}
                        className="schedule_traveler_pic" alt="travelerProfilePic" />
                    <p className="title">{this.state.traveler.name}</p>
                    <p className="info">
                        <b>{this.state.att}</b> attractions<br />
                        <b>{this.state.act}</b> activities<br />
                        <b>{this.state.res}</b> restaurants<br />
                        Start: {this.props.schedule[0].startdate}<br />
                        End: {this.props.schedule[0].enddate}
                    </p>
                    <div className="overlay"></div>
                    <div className="button1"
                        onClick={this.handleDetail}>
                        <p> Details </p>
                    </div>
                    <div className="button2"
                        onClick={this.handleChat}>
                        <p> Chat </p>
                    </div>
                </div>
            </div>
        );
    }
}