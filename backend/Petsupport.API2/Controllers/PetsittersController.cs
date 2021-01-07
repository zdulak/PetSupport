﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Petsupport.API2.Dtos.OutDtos;
using PetSupport.Core.Entities;
using PetSupport.Core.Interfaces;
using PetSupport.Infrastructure.Data.Data;

namespace PetSupport.API2.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PetsittersController : ControllerBase
    {
        private readonly DataContext _context;
        private readonly IRepository<Petsitter> _petSitterRepository;
        private readonly IMapper _mapper;

        public PetsittersController(DataContext context)
        {
            _context = context;
        }

        // GET: api/Petsitters
        [HttpGet]
        
        public async Task<ActionResult<IEnumerable<Petsitter>>> GetPetsitter()
        {
            return await _context.Petsitters.ToListAsync();
        }

        // GET: api/Petsitters/5
        [HttpGet("api/Petsitters/{id}/details")]
        public async Task<ActionResult<Petsitter>> GetPetsitter(int id)
        {
            var petsitter = await _context.Petsitters.FindAsync(id);

            if (petsitter == null)
            {
                return NotFound();
            }

            return petsitter;
        }

        // PUT: api/Petsitters/5
        
        [HttpPut("{id}")]
        public async Task<IActionResult> PutPetsitter(int id, Petsitter petsitter)
        {
            if (id != petsitter.Id)
            {
                return BadRequest();
            }

            _context.Entry(petsitter).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!PetsitterExists(id))
                {
                    return NotFound();
                }
                else
        public PetsittersController(IRepository<Petsitter> petSitterRepository, IMapper mapper)
        {
                    throw;
                }
            }

            return NoContent();
            this._petSitterRepository = petSitterRepository;
            this._mapper = mapper;
        }

        // POST: api/Petsitters
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Petsitter>> PostPetsitter(Petsitter petsitter)
        {
            _context.Petsitters.Add(petsitter);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetPetsitter", new { id = petsitter.Id }, petsitter);
        }

        // DELETE: api/Petsitters/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeletePetsitter(int id)
        {
            var petsitter = await _context.Petsitters.FindAsync(id);
            if (petsitter == null)
        [HttpGet]
        public async Task<ActionResult<PetsitterDTO[]>> Get()
        {
                return NotFound();
            }

            _context.Petsitters.Remove(petsitter);
            await _context.SaveChangesAsync();

            return NoContent();
            var results = await _petSitterRepository.GetAllAsync();
            return _mapper.Map<PetsitterDTO[]>(results);
        }

        private bool PetsitterExists(int id)
        [HttpGet("{id:int}")]
        public async Task<ActionResult<PetsitterDTO>> Get(int id)
        {
            return _context.Petsitters.Any(e => e.Id == id);
            var result = await _petSitterRepository.GetByIdAsync(id);
            return _mapper.Map<PetsitterDTO>(result);
        }
    }
}
