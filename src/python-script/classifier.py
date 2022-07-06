import joblib
import numpy as np
import json


def Classifier(scannerResult):
    from sklearn.preprocessing import MinMaxScaler  # for scaling
    features = scannerResult[0]    
    API_list = scannerResult[1]
    # filter the features list
    features = np.array(features)
    filter_arr = list(joblib.load("./SUPPORT.joblib"))
    features = features[filter_arr]

    # Features Scaling
    Sclfeatures = MinMaxScaler().fit_transform(features.reshape(len(features), -1))
    Sclfeatures = Sclfeatures.reshape(1, -1)
    # load the model
    model = joblib.load("./LOGISTIC_REGRESSION_MODEL.joblib")

    # get the prediction
    prediction = int(model.predict(Sclfeatures)[0])
    pred_pro = list(model.predict_proba(Sclfeatures)[0])
    if prediction == 0:
        return {
            "prediction": prediction,
            "details": {"prob": pred_pro, "apiList": topReason(API_list)},
        }
    return {"prediction": prediction, "details": {"prob": pred_pro}}


def topReason(API_list):
    import pandas as pd

    df = pd.read_html("https://malapi.io/", attrs={"id": "main-table"})
    Spying = (df[0]["Spying"][0]).split()
    Evasion = (df[0]["Evasion"][0]).split()
    malapiList = Lower(Spying + Evasion)
    API_list = Lower(API_list)

    return list(filter(lambda api: api in API_list, malapiList))


def Lower(l: list):
    return list(map(lambda x: x.lower(), l))
