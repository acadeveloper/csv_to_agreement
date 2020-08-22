import React from 'react';
import axios from 'axios';
import Button from '../components/Button';

import { downloadFile } from '../helpers/download.helpers';
import Loading from '../components/Loading';
import { zipFiles } from '../libraries/Zip.libraries';

export default class Home extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedFile: null,
      templateFile: null,
      isLoading: false,
      error: '',
    };
  }

  onDataUpload = (event) => {
    this.setState({
      selectedFile: event.target.files[0],
    });
  };

  onTemplateUpload = (event) => {
    this.setState({
      templateFile: event.target.files[0],
    });
  };

  onClickHandler = () => {
    const { selectedFile, templateFile } = this.state;

    const data = new FormData();
    data.append('csvData', selectedFile);
    data.append('template', templateFile);
    this.setState({
      isLoading: true,
    });
    axios
      .post('api/upload', data)
      .then(async (res) => {
        await zipFiles('agreements', res.data.files);
        this.setState({
          isLoading: false,
        });
      })
      .catch((error) => {
        this.setState({
          isLoading: false,
          error,
        });
      });
  };

  render() {
    const {
      selectedFile: dataFile,
      templateFile,
      isLoading,
      error,
    } = this.state;

    if (error) {
      return (
        <div
          className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
          role="alert"
        >
          <strong className="font-bold">Holy smokes!</strong>
          <span className="block sm:inline">
            Something went wrong. Please, reload the page!
          </span>
          <span className="absolute top-0 bottom-0 right-0 px-4 py-3">
            <svg
              className="fill-current h-6 w-6 text-red-500"
              role="button"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
            >
              <title>Close</title>
              <path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z" />
            </svg>
          </span>
        </div>
      );
    }

    return (
      <div className="p-10">
        <div
          className="w-auto sm:w-1/2 mb-4 bg-blue-100 border-l-4 border-blue-500 text-blue-700 p-4"
          role="alert"
        >
          <p className="font-bold">Agreement Generation Algorithm</p>
          <ul className="list-decimal pl-6 mt-2">
            <li>
              Take any <code>.docx</code> file
            </li>
            <li>
              Wrap generic data with curly braces and give a variable name to
              them. E.g. {'{name}'}
            </li>
            <li>
              Take any <code>.csv</code> file
            </li>
            <li>
              Make sure that column header names are the same as the variable
              names in <code>.docx</code> file
            </li>
            <li>Upload appropriate files below</li>
            <li>Wait for the result...</li>
          </ul>
        </div>

        <div className="w-auto sm:w-1/3">
          <h1 className="font-bold text-3xl mb-5">Agreement generator</h1>
          {isLoading ? (
            <div className="w-full h-32 flex items-center justify-center">
              <Loading />
            </div>
          ) : (
            <>
              <div>
                <p className="text-sm mb-2 text-gray-600">CSV File</p>
                <input
                  type="file"
                  name="data-file"
                  onChange={this.onDataUpload}
                />
                <hr style={{ margin: '20px 0' }} />
              </div>
              <div>
                <p className="text-sm mb-2 text-gray-600">Word Template File</p>
                <input
                  type="file"
                  name="template-file"
                  onChange={this.onTemplateUpload}
                />
                <hr style={{ margin: '20px 0' }} />
              </div>
              <Button
                disabled={!(dataFile && templateFile)}
                text="DOWNLOAD AGREEMENTS"
                onClick={this.onClickHandler}
                className="w-full tracking-wide"
              />
            </>
          )}
        </div>
      </div>
    );
  }
}
