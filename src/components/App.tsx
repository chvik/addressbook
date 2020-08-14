import React from "react";
import { Route, Switch } from "react-router";
import { ConnectedRouter } from "connected-react-router";
import { history } from "../store";
import { AddressBookPage } from "./AddressBookPage";
import { SettingsPage } from "./SettingsPage";

export const App: React.FunctionComponent = () => {
    return (
        <ConnectedRouter history={history}>
            <Switch>
                <Route exact path="/" render={() => <AddressBookPage />} />
                <Route path="/settings" render={() => <SettingsPage />} />
                <Route render={() => <div>Miss</div>} />
            </Switch>
        </ConnectedRouter>
    );
};
