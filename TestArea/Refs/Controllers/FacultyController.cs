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

    public class FacultyController : Controller
    {
        private readonly DataBaseContext _context;

        public FacultyController(DataBaseContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Faculty>>> GetFaculty()
        {
            return await _context.Faculties.ToListAsync();
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Faculty>> GetFaculty(int id)
        {
            var dFaculty = await _context.Faculties.FindAsync(id);

            if (dFaculty == null)
            {
                return NotFound();
            }

            return dFaculty;
        }

        [HttpPut("{id}")]
        public async Task<ActionResult<Faculty>> PutFaculty(int id, Faculty dFaculty)
        {
            dFaculty.id = id;

            _context.Entry(dFaculty).State = EntityState.Modified;

            try
            {
              await  _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!FacultyExists(id))
                {
                    return new JsonResult("Record not found");
                }
                else
                {
                    throw;
                }
            }

            return dFaculty;
        }

        [HttpPost]
        public async Task<ActionResult<Faculty>> PostFaculty([Bind("id,facultycode,facultynm")] Faculty dFaculty)
        {
            _context.Faculties.Add(dFaculty);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetFaculty", new { id = dFaculty.id }, dFaculty);
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult<Faculty>> DeleteFaculty(int id)
        {
            var dFaculty = await _context.Faculties.FindAsync(id);
            if (dFaculty == null)
            {
                return NotFound();
            }

            _context.Faculties.Remove(dFaculty);
            await _context.SaveChangesAsync();

            return dFaculty;
        }

        private bool FacultyExists(int id)
        {
            return _context.Faculties.Any(e => e.id == id);
        }

    }
}
