// Higher order Component (HOC) - A component (HOC) that renders another component
// Reuse code
// Render hijacking
// Prop manipulation
// Abstract state
import React from 'react';
import ReactDOM from 'react-dom';

const Info = (props) => (
    <div>
        <h1>Info</h1>
        <p>The info is: {props.info}</p>
    </div>
);

// using spread operator to replace the props
const withAdminWarning = (WrappedComponent) => {
    return (props) => (
        <div>
            {props.isAdmin && <p>This is private info. Please do not share.</p>}
            <WrappedComponent {...props}/>
        </div>
    );
};

const AdminInfo = withAdminWarning(Info);

const requireAuthentication = (WrappedComponent) => {
    return (props) => (
        <div>   
            {props.isAuthenticated ? 
            <WrappedComponent {...props}/> :
            <p>Please login.</p>}
            
        </div>
    );
};

const AuthInfo = requireAuthentication(Info);

//ReactDOM.render(<Info info="Info is here" />, document.getElementById('app'));
//ReactDOM.render(<AdminInfo isAdmin={true} info="Message  from me" />, document.getElementById('app'));
ReactDOM.render(
    <AuthInfo isAuthenticated={true} info="Message  from me" />,
 document.getElementById('app'));