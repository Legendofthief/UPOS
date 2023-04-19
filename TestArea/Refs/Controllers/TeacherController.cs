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
    [Route("Refs/[controller]")]
    [ApiController]

    public class TeacherController : Controller
    {
        private readonly DataBaseContext _context;

        public TeacherController(DataBaseContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Teacher>>> GetTeacher()
        {
            return await _context.Teachers.ToListAsync();
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Teacher>> GetTeacher(int id)
        {
            var dTeacher = await _context.Teachers.FindAsync(id);

            if (dTeacher == null)
            {
                return NotFound();
            }

            return dTeacher;
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> PutTeacher(int id, Teacher dTeacher)
        {
            dTeacher.id = id;

            _context.Entry(dTeacher).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!TeacherExists(id))
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
        public async Task<ActionResult<Teacher>> PostTeacher([Bind("id,departmentid,recordnum,fio,qualification,startdt,enddt")] Teacher dTeacher)
        {
            _context.Teachers.Add(dTeacher);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetTeacher", new { id = dTeacher.id }, dTeacher);
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult<Teacher>> DeleteTeacher(int id)
        {
            var dTeacher = await _context.Teachers.FindAsync(id);
            if (dTeacher == null)
            {
                return NotFound();
            }

            _context.Teachers.Remove(dTeacher);
            await _context.SaveChangesAsync();

            return dTeacher;
        }

        private bool TeacherExists(int id)
        {
            return _context.Teachers.Any(e => e.id == id);
        }
    }
}
