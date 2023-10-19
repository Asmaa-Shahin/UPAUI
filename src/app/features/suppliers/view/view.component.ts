import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ListSupplierAttachmentVM } from 'src/app/shared/models/SupplierAttachmentVM';
import { EditSupplierVM } from 'src/app/shared/models/supplierVM';
import { LoggedUser } from 'src/app/shared/models/userVM';
import { AuthenticationService } from 'src/app/shared/services/guards/authentication.service';
import { SupplierService } from 'src/app/shared/services/supplierService.service';
import { UploadFilesService } from 'src/app/shared/services/uploadfilesservice';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css']
})
export class ViewComponent implements OnInit {

  supplierObj: EditSupplierVM;
  lang = localStorage.getItem("lang");
  currentUser: LoggedUser
  errorMessage: string;
  errorDisplay: boolean = false;
  display: boolean = false;
  lstAllSupplierAttachments: ListSupplierAttachmentVM[] = [];

  constructor(private supplierService: SupplierService, private authenticationService: AuthenticationService,
    private uploadService: UploadFilesService,
    private route: Router, private activeRoute: ActivatedRoute) {
    this.currentUser = this.authenticationService.currentUserValue;
  }

  ngOnInit(): void {
    this.supplierObj = { id: 0, code: '', name: '', nameAr: '', address: '', addressAr: '', email: '', eMail: '', mobile: '', website: '', contactPerson: '', fax: '', notes: '' }
    let id = this.activeRoute.snapshot.params['id'];
    this.supplierService.GetSupplierById(id).subscribe(
      data => {
        this.supplierObj = data;
        this.supplierService.GetSupplierAttachmentsBySupplierId(this.supplierObj.id).subscribe(files => {
          this.lstAllSupplierAttachments = files;
        });
      });
  }
  downloadFile(fileName) {
    var filePath = `${environment.Domain}UploadedAttachments/`;
    this.uploadService.downloadSupplierFile(fileName).subscribe(file => {
      var dwnldFile = filePath + 'SupplierAttachments/' + fileName;
      if (fileName != "" || fileName != null)
        window.open(dwnldFile);
    })
  }
  

  back() { this.route.navigate(['/dash/suppliers']); }
}
