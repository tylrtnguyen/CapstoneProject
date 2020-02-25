<h1> GET THAT API </h1>

    getAPI() {
        var token = {
            token:
                "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVlNDRkNzUzNTUxN2U0MGI1NTk3MTIyMCIsImlhdCI6MTU4MjM1NjQ1NSwiZXhwIjoxNTgyMzYwMDU1fQ.c_qrkTC634khqvVKHGrsfcvU5hb_4vEufwNZbQ0jFKQ",
            expiresIn: "3600s",
            status: "Logged In"
        };
        var url = "https://restaskest-rest-api.herokuapp.com/api/user";
        let header = new HttpHeaders({
          "Authorization": "Bearer " + token,
          "Content-Type": "application/json",
        })
        return this.http.get(url, { headers: header }).subscribe((result) => {
          this.retrieveData(result);
      }, (error) => {
          console.log(error);
      });;

    }
    retrieveData(data){
      var readable_data = JSON.stringify(data)
      console.log(readable_data)
    }

