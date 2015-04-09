[![Circle CI](https://circleci.com/gh/blikkhq/linkedin-extractor.svg?style=svg)](https://circleci.com/gh/blikkhq/linkedin-extractor)

An API that extracts metadata from a given Linkedin URL. More sections will be added in the future.


## Usage

```javascript
var ex = require('linkedin-extractor');
ex.getFromUrl('https://www.linkedin.com/in/studentsample', function(err, res){
  console.log(JSON.stringify(res));
});
```

## Example Response

For `https://www.linkedin.com/in/studentsample`:
  
```json
{
  "formattedName": "Student Sample",
  "headline": "Social Media Branding Specialist | Seeking Marketing Internship",
  "location": "Greater Los Angeles Area",
  "industry": "Marketing and Advertising",
  "numConnections": 6,
  "summary": "SAMPLE STUDENT\n\nA second year Business Administration undergraduate student at UC Riverside with an interest in marketing, advertising, and social media. Seeking a summer internship to apply my experience assisting a company’s branding needs through social media outreach, developing marketing plans, digital marketing, and conducting customer research.\n\nSpecialties\n•Event planning\n•Social networking and marketing \n•Account management\n• Microsoft Offices (Word, PowerPoint, Excel)\n• Adobe CS5.5 Suite (Photoshop, Flash)",
  "pictureUrl": "https://media.licdn.com/media/p/4/000/15e/3ac/174b560.jpg",
  "publicProfileUrl": "https://www.linkedin.com/in/studentsample",
  "experience": [
    {
      "id": "278792035",
      "title": "Advertising Account Executive",
      "company": "The Highlander Newspaper",
      "summary": "•Manage more than 100 clients and their advertising needs.\n•Design advertising campaigns and marketing related plans utilizing AdPro software.\n•Create and work with designers using Adobe software to develop effective advertisements.\n•Raise approximately $3,000 in advertising revenue each month.",
      "isCurrent": true,
      "startDate": "October 2011",
      "location": "UC Riverside"
    },
    {
      "id": "278792332",
      "title": "Advertising Intern",
      "company": "Young & Rubicam",
      "summary": "•Provided customer support for accounts including Hilton, Jenny Craig and Southern California Edison.\n•Collaborated with a variety of departments including Account Management, Public Relations and Finance.\n•Prepared briefs, PowerPoint presentations, competitive reports and presentation boards.\n•Promoted company brand, cross-promoted industry collaborations, and engaged fans through Facebook and Twitter.\n•Delivered critical support during production of Jenny Craig commercials and Toshiba online media videos.",
      "isCurrent": false,
      "startDate": "June 2010",
      "endDate": "September 2011",
      "location": "Irvine, CA"
    },
    {
      "id": "278792815",
      "title": "Server and Event Planner",
      "company": "Bob's Big Boy",
      "summary": "•Planned events and activities for parties of 20 to 100 people.\n•Advertised event packages through social media and print ads in local newspaper. \n•Provided excellent customer service, maintained cashier drawer and ensured accurate daily cash records.\n•Worked 20 hours per week while attending school full time.",
      "isCurrent": false,
      "startDate": "January 2009",
      "endDate": "August 2010",
      "location": "Riverside, CA"
    }
  ],
  "skills": [
    {
      "skill": "Marketing"
    },
    {
      "skill": "Advertising"
    },
    {
      "skill": "Presentations"
    },
    {
      "skill": "Marketing Communications"
    },
    {
      "skill": "Sales"
    },
    {
      "skill": "Social Media Marketing"
    },
    {
      "skill": "Adobe Creative Suite"
    },
    {
      "skill": "PowerPoint"
    },
    {
      "skill": "Product Marketing"
    }
  ],
  "urlResources": [
    {
      "name": "Personal Website",
      "url": "http://www.careers.ucr.edu"
    }
  ],
  "education": [
    {
      "id": "108823398",
      "schoolName": "University of California, Riverside",
      "degree": "Bachelor of Science in Business Administration",
      "fieldOfStudy": "Marketing",
      "grade": "Sophomore",
      "startDate": {
        "year": 2011
      },
      "endDate": {
        "year": 2015
      }
    }
  ]
}
```