using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using System.Text;
using System.IO;

namespace КлассыПоПрактике
{
    internal class Cafedra
    {
        public int CodCafedra { get; set; }

        public string CodFaculty { get; set; }

        public string Name { get; set; }

        public string MainCaf { get; set; }
    }
}
