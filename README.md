# PHOTO ALBUMS PROJECT

This project is a web application built using ASP.NET Core 8 for the backend and React.js for the frontend. The application allows users to create and manage photo albums. The users of the project are getting from an external API and the data are deserialized for develop the custom photo albums API.

## Table of Contents

- [Getting Started](#getting-started)
- [Installation](#installation)
- [Database Setup](#database-setup)
- [Running the Application](#running-the-application)
- [Testing](#testing)


## Getting Started

First install the following software on your machine:

- [.NET 8 SDK](https://dotnet.microsoft.com/download/dotnet/8.0)
- [Node.js](https://nodejs.org/) (which includes npm)
- [SQL Server](https://www.microsoft.com/en-us/sql-server/sql-server-downloads) or any other database supported by Entity Framework Core
- [Git](https://git-scm.com/)

## Installation

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/Epifanios/photo_album_project.git
   cd PhotoAlbums

2. **Navigate to the PhotoAlbums directory and restore the .NET dependencies.**:
   ```bash
   cd PhotoAlbums
   dotnet restore

3. **Navigate to the ClientApp directory and install the npm dependencies.**:
   ```bash
   cd web
   npm install


## Database Setup

1. **Open appsettings.json in the PhotoAlbums directory and update the connection string based on your SQL Server instance.**:
   


2. **Migrations and Seed Database**:
   ```bash
   cd PhotoAlbums
   dotnet ef database update


## Running the Application

1. **Run the backend application**:
   ```bash
   dotnet run

2. **Run the frontend application**:
   ```bash
   cd web
   npm start

3. **Open your browser and navigate to http://localhost:3000 to view the React frontend. The backend API will be running on http://localhost:5163.**


## TESTING

1. **You can test the backend application using this link on your browser http://localhost:5163/swagger/index.html after running the application**
   


