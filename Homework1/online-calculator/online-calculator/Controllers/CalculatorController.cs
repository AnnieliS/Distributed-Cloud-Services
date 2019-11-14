using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace online_calculator.Controllers
{
    [Route("api/[controller]")]
    public class homeworkController : Controller
    {
        // GET: api/values
        [HttpGet]
        public IEnumerable<string> Get()
        {
            return new string[] { "value1", "value2" };
        }

        // GET api/values/5
        [HttpGet("{id}")]
        public string Get(int id)
        {
            return "value";
        }

        // POST api/values
        [HttpPost]
        public void Post([FromBody]string value)
        {
        }

        // PUT api/values/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE api/values/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }

        // GET api/calculator/GetFiveRandomNumbers

        [HttpGet("GetFiveRandomNumbers")]

        public List<int> GetFiveRandomNumbers()

        {

            var numbers = new List<int>();

            var rnd = new Random();

            int count = 0;

            while (count < 5)
            {

                int newNum = rnd.Next(1, 21); // generate a random number between 1- 20

                if (!numbers.Contains(newNum))
                {

                    numbers.Add(newNum);

                    count++;

                }

            }

            return numbers;

        }




        //Start of Homework



        // GET api/values/Targil3

        [HttpGet("Targil3")]

        public int Targil3(string sentence)

        {

            if (sentence == null)
            {
                return 0;
            }

            else
            {

                var results = sentence.Split(' ');


                int i = 0;

                foreach (string s in results)
                {


                    i++;

                }

                return i;
            }

        }



        // GET api/values/Targil11
        [HttpGet("Targil11")]

        public string Targil11(string word)

        {

            if (word == null)
            {
                return "No word sent";
            }

            else
            {
                char[] revWord = word.ToCharArray();
                Array.Reverse(revWord);
                return new string(revWord);
            }
        }






        // GET api/values/Targil12
        [HttpGet("Targil12")]

        public string Targil12(string word)

        {

            if (word == null)
            {
                return "No word sent";
            }

            else
            {
                word = word.Remove(0, 1);
                word = word.Remove(word.Length - 1, 1);
                return word;
            }
        }








        // POST api/values/Targil13
        [HttpPost("Targil13")]

        public List<string> Targil13([FromBody]List<int> nums)

        {
            int sum = 0;
            int multi = 1;
            int div = 0;
            int sub = 0;

            if (nums.Count < 2)
            {
                List<string> error = new List<string> { "not enough nums sent" };
                return error;
            }

            else if (nums.Count > 2)
            {
                List<String> error = new List<string> { "too many numbers sent" };

                return error;

            }

            else
            {
                nums.Sort();
                nums.Reverse();

                sub = nums.ElementAt(0) - nums.ElementAt(1);
                div = nums.ElementAt(0) / nums.ElementAt(1);

                foreach (int i in nums)
                {
                    sum += i;
                    multi *= i;
                }

                List<string> result = new List<string> {
                    "Sum is " + sum,
                    "Sub is " + sub,
                    "multiply is " + multi,
                    "divide is " + div
                };

                return result;
            }

        }







        // POST api/values/Targil15
        [HttpPost("Targil15")]

        public string Targil15([FromBody]List<int> nums)

        {

            if (nums.Count > 3)
            {

                return "sent too many params";
            }

            else if (nums.Count < 3)
            {

                return "not enough params";
            }

            else
            {
                nums.Sort();
                nums.Reverse();

                return "Max number is: " + nums.ElementAt(0);

            }
        }


    }


}
