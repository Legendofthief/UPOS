using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.EntityFrameworkCore;
using Refs.Models;
using RefsCor.Models;

namespace Refs.Controllers
{
    [ApiController]
    [Route("Refs/[controller]")]

    public class StudentController : Controller
    {
        private readonly DataBaseContext _context;
        private readonly IWebHostEnvironment _env;

        public StudentController(DataBaseContext context, IWebHostEnvironment env)
        {
            _context = context;
            _env= env;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Student>>> GetStudent()
        {
            return await _context.Students.ToListAsync();
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Student>> GetStudent(int id)
        {
            var dFaculty = await _context.Students.FindAsync(id);

            if (dFaculty == null)
            {
                return NotFound();
            }

            return dFaculty;
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> PutStudent(int id, Student dStudent)
        {
            dStudent.id = id;

            _context.Entry(dStudent).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!StudentExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        [HttpPost]
        public async Task<ActionResult<Student>> PostStudent([Bind("id,groupid,recordnum,studentname,phone,photo")] Student dStudent)
        {
            _context.Students.Add(dStudent);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetStudent", new { id = dStudent.id }, dStudent);
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult<Student>> DeleteStudent(int id)
        {
            var dStudent = await _context.Students.FindAsync(id);
            if (dStudent == null)
            {
                return NotFound();
            }

            _context.Students.Remove(dStudent);
            await _context.SaveChangesAsync();

            return dStudent;
        }

        private bool StudentExists(int id)
        {
            return _context.Students.Any(e => e.id == id);
        }

        [Route("SaveFile")]
        [HttpPost]
        public JsonResult SaveFile()
        {
            try
            {
                var httpRequest = Request.Form;
                var postedFile = httpRequest.Files[0];
                string filename = postedFile.FileName;
                var physicalPath = _env.ContentRootPath + "/Photos/" + filename;

                using (var stream = new FileStream(physicalPath, FileMode.Create))
                {
                    postedFile.CopyTo(stream);
                }

                return new JsonResult(filename);
            }
            catch (Exception)
            {
                return new JsonResult("anonymous.png");
            }
        }

    }
}
