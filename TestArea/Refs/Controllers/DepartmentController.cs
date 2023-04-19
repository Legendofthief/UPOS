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
    public class DepartmentController : Controller
    {
        private readonly DataBaseContext _context;

        public DepartmentController(DataBaseContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Department>>> GetDepartment()
        {
            return await _context.Departments.ToListAsync();
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Department>> GetDepartment(int id)
        {
            var dDepartment = await _context.Departments.FindAsync(id);

            if (dDepartment == null)
            {
                return NotFound();
            }

            return dDepartment;
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> PutDepartment(int id, Department dDepartment)
        {
            dDepartment.id = id;

            _context.Entry(dDepartment).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!DepartmentExists(id))
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
        public async Task<ActionResult<Department>> PostDepartment([Bind("id,departmentcode,departmentnm")] Department dDepartment)
        {
            _context.Departments.Add(dDepartment);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetDepartment", new { id = dDepartment.id }, dDepartment);
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult<Department>> DeleteDepartment(int id)
        {
            var dDepartment = await _context.Departments.FindAsync(id);
            if (dDepartment == null)
            {
                return NotFound();
            }

            _context.Departments.Remove(dDepartment);
            await _context.SaveChangesAsync();

            return dDepartment;
        }

        private bool DepartmentExists(int id)
        {
            return _context.Departments.Any(e => e.id == id);
        }
    }
}
