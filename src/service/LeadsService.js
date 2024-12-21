import { BASE_URL } from "../URL";

export async function fetchData(){
    try{

        const url = `${BASE_URL}/admin/leads/all`;
       
        const response =  await fetch(url, {
            method: 'GET',
            headers:{
                "Content-Type": "application/json",
            }
        })

        const responseData = await response.json();
        return {
            statusCode: response.status,
            data: responseData,
        };

    }catch (error) {
        console.error("Error:", error);
        return {
          statusCode: null,
          data: { status: "ERROR", msg: "An error occurred. Please check your network and try again." },
        };
    }
}


export async function updateLead(data) {
    const requestData = {
      "interestID": data.interestID,
      "interested": data.interested,
      "status": data.status,
      "didAdminCalled": data.didAdminCalled,
      "didUserAnswered": data.didUserAnswered,
      "lastCallTime": data.lastCallTime,
      "notes": data.notes,
      "priority": data.priority
    };
  
    const url = `${BASE_URL}/admin/leads/update`;
  
    const response = await fetch(url, {
      method: 'PUT',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestData)  // Corrected this line
    });
  
    const responseData = await response.json();
  
    console.log('resp from server + ' + responseData);
    // return {
    //     statusCode: response.status,
    //     data: responseData,
    // };
  }
  