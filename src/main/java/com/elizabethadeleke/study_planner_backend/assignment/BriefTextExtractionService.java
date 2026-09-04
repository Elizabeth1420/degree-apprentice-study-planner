package com.elizabethadeleke.study_planner_backend.assignment;

import java.io.IOException;
import java.io.InputStream;
import java.util.Locale;
import java.util.Optional;

import org.apache.pdfbox.Loader;
import org.apache.pdfbox.pdmodel.PDDocument;
import org.apache.pdfbox.text.PDFTextStripper;
import org.apache.poi.xwpf.extractor.XWPFWordExtractor;
import org.apache.poi.xwpf.usermodel.XWPFDocument;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.server.ResponseStatusException;

@Service
public class BriefTextExtractionService {

    public String extractText(MultipartFile file) {
        String fileName = Optional.ofNullable(file.getOriginalFilename()).orElse("").toLowerCase(Locale.ROOT);
        String contentType = Optional.ofNullable(file.getContentType()).orElse("");

        try {
            if ("application/pdf".equals(contentType) || fileName.endsWith(".pdf")) {
                return extractPdfText(file.getBytes());
            }

            if ("application/vnd.openxmlformats-officedocument.wordprocessingml.document".equals(contentType)
                    || fileName.endsWith(".docx")) {
                return extractDocxText(file.getInputStream());
            }
        } catch (IOException exception) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Could not read uploaded file", exception);
        }

        throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Only PDF and DOCX files are supported");
    }

    private String extractPdfText(byte[] fileBytes) throws IOException {
        try (PDDocument document = Loader.loadPDF(fileBytes)) {
            return new PDFTextStripper().getText(document).trim();
        }
    }

    private String extractDocxText(InputStream inputStream) throws IOException {
        try (XWPFDocument document = new XWPFDocument(inputStream);
                XWPFWordExtractor extractor = new XWPFWordExtractor(document)) {
            return extractor.getText().trim();
        }
    }
}