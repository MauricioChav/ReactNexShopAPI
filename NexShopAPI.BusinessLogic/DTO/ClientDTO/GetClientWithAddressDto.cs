using NexShopAPI.BusinessLogic.DTO.AddressDTO;
using NexShopAPI.DataAccess.Models;
using System.ComponentModel.DataAnnotations;

namespace NexShopAPI.BusinessLogic.DTO.ClientDTO
{
    public class GetClientWithAddressDto : GetClientDto
    {
        public GetAddressFromClientDTO? Address { get; set; }
    }
}
