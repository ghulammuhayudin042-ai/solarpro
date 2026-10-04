import {Component} from 'react';
export default class ErrorBoundary extends Component{
 state={err:null};static getDerivedStateFromError(err){return {err}}
 render(){return this.state.err?<div className="auth" style={{gridTemplateColumns:'1fr'}}><div className="card ac" style={{textAlign:'center'}}><h1>Something went wrong</h1><p className="mut">The page hit an unexpected error. Reload to continue; your data is safe in local storage.</p><button className="btn" onClick={()=>{this.setState({err:null});location.hash='#/';location.reload()}}>Reload app</button></div></div>:this.props.children}}
